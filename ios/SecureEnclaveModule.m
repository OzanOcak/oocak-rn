//
//  SecureEnclaveModule.m
//  oocakrn
//
//  Created by armchip on 2026-10-31.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SecureEnclaveModule, NSObject)

RCT_EXTERN_METHOD(generateKey:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(signChallenge:(NSString *)challenge
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deleteKey:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
