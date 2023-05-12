
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
    }
    
    const isVAlidRequestBody = function (requestBody) {
        return Object.keys(requestBody).length > 0
    }

    const isValidPassword = function (pw) {
        let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
        if (pass.test(pw)) return true;
      };

      const validString=function(value){
        if(typeof value==='string' && value.trim().length===0) return false
        return true
      }
      
    const objectIdValid = function (value) {
      return mongoose.Types.ObjectId.isValid(value);
      };


    const nameRegex = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/
    
    const phoneRegex =  /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/

    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/



module.exports={isValid,isVAlidRequestBody,isValidPassword,validString, nameRegex,objectIdValid,phoneRegex,emailRegex}