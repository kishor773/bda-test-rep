var axios = require("axios");
var dotenv = require("dotenv");
dotenv.config();
module.exports.postEmailDataService = async (data) => {
    let VARIABLE_NEW = data;
    console.log("VARIABLE_NEW--", VARIABLE_NEW);
    // console.log(
    //     "upcomingSessions Length-->",
    //     VARIABLE_NEW.data.length
    // );
    let emailBody = `Hi ${VARIABLE_NEW.first_name},
            <br>
            <br>New Signup
            <ul>
            </ul>
            <br>
                  Thank you,<br />Team BDA<br />
                  This automated mail was sent by BDA. Please do not reply
                  directly to this email. For questions or assistance, please get in touch
                  with info@mailers.codeswift.in."`;
    let emailAPI1 = process.env.EMAIL_SERVICE_BASE_URL;
    let emailApibody = {
        from: "info@mailers.codeswift.in",
        to: VARIABLE_NEW.email,
        subjectLine: "New Signup Mail",
        htmlToSend: Buffer.from(emailBody).toString("base64"),
        swiftMailApiKey: process.env.SWIFT_EMAIL_KEY,
    };

    console.log(
        "emailApibody--->",
        emailApibody
    );

    // //api1
    axios.post(emailAPI1, emailApibody).then(
        (response) => {
            console.log("res email from api--->", response.data);

            return response.data.message;
        },
        (error) => {
            console.log("email error from api-->", error);
            return new Error(
                "Failed to send email to all users",
                error
            );
        }
    );
    // return data

}