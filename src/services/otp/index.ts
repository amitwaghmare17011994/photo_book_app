import { post } from "..";

export const sendOTP = async (phoneNumber: string) => {
    try {
         
        const res = await post('send_otp', { phoneNumber: phoneNumber }) as { url: string }
        return res;
    } catch (error) {
        throw error
    }
}

export const verifyOTP = async (phoneNumber: string, otp: number) => {
    try {

        const res = await post('verify_otp', { phoneNumber: phoneNumber, otp: otp }) as { otpVerified: boolean }
        return res.otpVerified;
    } catch (error) {
        throw error
    }

}