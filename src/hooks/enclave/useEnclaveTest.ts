import { NativeModules } from 'react-native';

const { SecureEnclaveModule } = NativeModules;

export const useEnclaveTest = () => {
  const testGenerate = async () => {
    try {
      console.log('Generating key...');
      const publicKey = await SecureEnclaveModule.generateKey();
      console.log('✅ Public Key Generated:', publicKey);
      alert('Key generated! Check Metro console.');
    } catch (e: any) {
      console.error('Key Gen Error:', e);
      alert('Failed to generate key: ' + e.message);
    }
  };

  const testSign = async () => {
    try {
      console.log('Signing challenge...');
      // Wait for Face ID prompt
      const signature = await SecureEnclaveModule.signChallenge(
        'my-secret-challenge',
      );
      console.log('✅ Signature Generated:', signature);
      alert('Signed successfully! Check Metro console.');
    } catch (e: any) {
      console.error('Sign Error:', e);
      alert('Failed to sign: ' + e.message);
    }
  };

  return { testGenerate, testSign };
};
