//
//  SecureEnclaveModule.swift
//  oocakrn
//
//  Created by armchip on 2026-10-31.
//

import Foundation
import LocalAuthentication
import Security
import React

@objc(SecureEnclaveModule)
class SecureEnclaveModule: NSObject {
  
  private let keyTag = "com.oocakrn.secure-enclave-key".data(using: .utf8)!

  // 1. Generate the key
  @objc func generateKey(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    // Enforce biometrics and prevent iCloud sync
    let access = SecAccessControlCreateWithFlags(
      kCFAllocatorDefault,
      kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly,
      [.privateKeyUsage, .biometryCurrentSet],
      nil
    )!
    
    let attributes: [String: Any] = [
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecAttrKeySizeInBits as String: 256,
      kSecAttrTokenID as String: kSecAttrTokenIDSecureEnclave,
      kSecPrivateKeyAttrs as String: [
        kSecAttrIsPermanent as String: true,
        kSecAttrApplicationTag as String: keyTag,
        kSecAttrAccessControl as String: access
      ]
    ]
    
    // Clean up old key if it exists
    let deleteQuery: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: keyTag
    ]
    SecItemDelete(deleteQuery as CFDictionary)
    
    var error: Unmanaged<CFError>?
    guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
      reject("KEY_GEN_FAILED", "Failed to generate key", error?.takeRetainedValue() as Error?)
      return
    }
    
    guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
      reject("PUB_KEY_FAILED", "Failed to get public key", nil)
      return
    }
    
    var pubError: Unmanaged<CFError>?
    guard let pubData = SecKeyCopyExternalRepresentation(publicKey, &pubError) as Data? else {
      reject("PUB_EXPORT_FAILED", "Failed to export public key", pubError?.takeRetainedValue() as Error?)
      return
    }
    
    resolve(pubData.base64EncodedString())
  }
  
  // 2. Sign a challenge
  @objc func signChallenge(_ challenge: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let context = LAContext()
    context.localizedReason = "Sign in securely"
    
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: keyTag,
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecReturnRef as String: true,
      kSecUseAuthenticationContext as String: context
    ]
    
    var item: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &item)
    
    guard status == errSecSuccess, let privateKey = item as! SecKey? else {
      reject("KEY_NOT_FOUND", "Failed to find key. Status: \(status)", nil)
      return
    }
    
    let dataToSign = challenge.data(using: .utf8)!
    var signError: Unmanaged<CFError>?
    
    guard let signature = SecKeyCreateSignature(
      privateKey,
      .ecdsaSignatureMessageX962SHA256,
      dataToSign as CFData,
      &signError
    ) as Data? else {
      reject("SIGN_FAILED", "Failed to sign", signError?.takeRetainedValue() as Error?)
      return
    }
    
    resolve(signature.base64EncodedString())
  }
  
  // 3. Delete the key
  @objc func deleteKey(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: keyTag
    ]
    let status = SecItemDelete(query as CFDictionary)
    resolve(status == errSecSuccess || status == errSecItemNotFound)
  }

  @objc static func requiresMainQueueSetup() -> Bool { return true }
}
