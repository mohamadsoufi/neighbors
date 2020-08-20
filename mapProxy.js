// const aws = require("aws-sdk");
const useLoadScript = require("useLoadScript");
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const map = new useLoadScript.MAP({
    accessKeyId: secrets.REACT_APP_GOOGLE_MAPS_API_KEY,
});

// exports.sendEmail = (to, text, subj) => {
//     return ses
//         .sendEmail({
//             Source: "field.equinox@spicedling.email",
//             Destination: {
//                 ToAddresses: [to],
//             },
//             Message: {
//                 Body: {
//                     Text: {
//                         Data: text,
//                     },
//                 },
//                 Subject: {
//                     Data: subj,
//                 },
//             },
//         })
//         .promise();
// };
