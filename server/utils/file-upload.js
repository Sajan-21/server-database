const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

exports.fileUpload = async function (file, directory) {

    return new Promise((resolve, reject) => {
        try {
            // console.log("file : ", file);
            // console.log("directory : ", directory);

            let mime_type = file.split(';')[0].split(":")[1].split('/')[1];
            // console.log("mime_type : ", mime_type);

            if(mime_type === "png" || "jpeg" || "jpg" || "mp4" || "pdf") {
                // console.log("Allowed file type...");

                // console.log("random number : ", String(Math.floor(Math.random()*100)));
                // console.log("dayjs() : ", dayjs());

                let file_name = dayjs() + String(Math.floor(Math.random()*100))  + "." + mime_type;;
                // console.log("file_name : ", file_name);

                let upload_path = `uploads/${directory}`;
                // console.log("upload_path : ", upload_path);

                let base64 = file.split(';base64,')[1];
                // console.log("base64 : ", base64);

                fs.mkdir(upload_path, {recursive : true}, (err) => {
                    if(err) {
                        console.log("err : ", err);
                        reject(err.message ? err.message : err);
                    }else {
                        let upload_path = `uploads/${directory}/${file_name}`;
                        console.log("upload_path : ", upload_path);

                        fs.writeFile(
                            upload_path,
                            base64,
                            {encoding : "base64"},
                            function(err) {
                                if(err) {
                                    console.log("err : ", err);
                                    reject(err.message ? err.message : err);
                                }else {
                                    resolve(upload_path);
                                }
                            }
                        )
                    }
                })

            }else {
                console.log("Invallid file type ")
                reject("File size up to 100mb and Formats .png, .jpeg, .jpg, .mp4, .pdf are only allowed");
            }
            
        } catch (error) {
            console.log("error : ", error);
            reject(error.message ? error.message : error);
        }
    })

}

exports.getServerDatabase = async function() {
    return new Promise((resolve, reject) => {
        const file_path = path.join(__dirname, '../uploads/datas/datas.json');
        fs.readFile(file_path, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.dataUpload = async function(body, directory) {
    return new Promise((resolve, reject) => {
        try {
            console.log("body : ",body);
            console.log("directory : ",directory);

            let file_path = `uploads/${directory}`;
            console.log("file_path : ",file_path);

            let file_name = "datas.json";

            fs.mkdir(file_path, {recursive : true}, (err) => {
                if(err) {
                    console.log("err : ",err);
                    reject(err.message ? err.message : err);
                }else {
                    let upload_path = `uploads/${directory}/${file_name}`;
                    console.log("upload_path : ",upload_path);

                    let dataToWrite = JSON.stringify(body, null, 2); 

                    fs.writeFile(upload_path, dataToWrite, 'utf8', (err) => {
                        if (err) {
                            console.log("Error writing file:", err);
                            reject(err);
                        } else {
                            console.log("File successfully written!");
                            resolve({ success: true, message: "File successfully written!" });
                        }
                    });
                }
            })
        } catch (error) {
            console.log("error : ",error);
            reject(error.message ? error.message : error);
        }
    })
}

// exports.dataUpload = async function(body, directory) {
//     return new Promise((resolve, reject) => {
//         try {
//             console.log("body:", body);
//             console.log("directory:", directory);

//             let file_path = path.join('uploads', directory);
//             console.log("file_path:", file_path);

//             // Convert the body (object) to a JSON string
//                let dataToWrite = JSON.stringify(body, null, 2);  // Pretty print JSON for readability

//             // Write the data to the file
//             fs.writeFile(file_path, dataToWrite, 'utf8', (err) => {
//                 if (err) {
//                     console.log("Error writing file:", err);
//                     reject(err); // Reject the promise with the error
//                 } else {
//                     console.log("File successfully written!");
//                     resolve({ success: true, message: "File successfully written!" });
//                 }
//             });
//         } catch (error) {
//             console.log("An error occurred:", error);
//             reject(error); // Reject the promise with the caught error
//         }
//     });
// };