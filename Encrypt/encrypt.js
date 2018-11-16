let CryptoJS = require('crypto-js');

module.exports.Encrypto = {
    EncryptoPassword: (password) => {
        let cipherText = CryptoJS.AES.encrypt(password, GetInverseOfText(password));
        
        return cipherText.toString();
    },
    ComparePassword: (passwordBank, password) => {
        let bytes = CryptoJS.AES.decrypt(passwordBank, GetInverseOfText(password));
        let plainTextPassword = bytes.toString(CryptoJS.enc.Utf8);
        
        if(plainTextPassword == password)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function GetInverseOfText(text)
{
    let newText = "";
    for (let i = text.length - 1; i >= 0; i--) {
        newText += text[i];
    }
    return newText;
}