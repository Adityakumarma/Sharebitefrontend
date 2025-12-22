import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// register 
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST", `${serverURL}/register`, reqBody)

}

// login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST", `${serverURL}/login`, reqBody)

}

// add donation
export const addDonationAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST", `${serverURL}/add-donations`, reqBody,reqHeader)

}

// get all donations
export const getAllDonationsAPI = async (reqHeader)=>{
    return await commonAPI("GET", `${serverURL}/all-donations`,{},reqHeader)

}

// get available donations
export const getAvailableDonationsAPI = async (reqHeader) =>{
  return await commonAPI("GET",`${serverURL}/available-donations`,{}, reqHeader)

}

// claim donation
export const claimDonationAPI = async (id, reqHeader) =>{
 return await commonAPI("PUT",`${serverURL}/claim-donation/${id}`, {}, reqHeader)

}

// my claimed donations
export const getMyDonationsAPI = async (reqHeader) =>{
  return await commonAPI("GET",`${serverURL}/claimed-donations`,{}, reqHeader)

}

// complete donation
export const completeDonationAPI = async (id, reqHeader) =>{
  return await commonAPI("PUT",`${serverURL}/complete-donation/${id}`, {},reqHeader)

}

// get all users
export const getAllUsersAdminAPI = async (reqHeader) =>{
 return await commonAPI("GET", `${serverURL}/all-users`, {}, reqHeader)

}

// get all donations- admin
export const getAllDonationsAdminAPI = async (reqHeader) =>{
 return await commonAPI("GET", `${serverURL}/donations`, {}, reqHeader)

}

// get all NGOs 
export const getAllNGOAdminAPI = async (reqHeader) =>{
 return await commonAPI("GET", `${serverURL}/all-ngos`, {}, reqHeader)

}

// delete a user
export const deleteUserAPI = async (id,reqHeader) =>{
 return await commonAPI("DELETE", `${serverURL}/delete-user/${id}`, {}, reqHeader)

}

// ngo verification
export const ngoVerificationAPI = async (id,action,reqHeader) =>{
 return await commonAPI("PUT", `${serverURL}/ngo-verification/${id}`, {action}, reqHeader)

}

