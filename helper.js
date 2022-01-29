module.exports = {
    createFiles: function(files, folder){
        let fileData = [];

        for(let i = 0; i < files.length; i++){
            let fileType = files[i].split(".");
            fileType = fileType[fileType.length-1];

            let file = {
                name: files[i].name,
                link: `/${folder}/${this.fileId(25)}.${fileType}`,
            };

            files[i].mv(`${__dirname}/..${file.link}`);

            fileData.push(file);
        }

        return fileData;
    },

    fileId: function(length){
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }
}