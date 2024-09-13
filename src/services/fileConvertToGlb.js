

const CadApi = require('@asposecloud/aspose-cad-cloud');
const fs = require('fs');

// Aspose.CAD API credentials
const cadApi = new CadApi.CadApi(CLIENT_ID, CLIENT_SECRET);

// Function to convert file
async function convertFile() {
    const inputElement = document.getElementById('fileInput');
    const file = inputElement.files[0];
    
    if (!file) {
        console.log("No file selected");
        return;
    }

    const fileName = file.name;
    
    // Read the file and upload to Aspose cloud storage
    fs.readFile(fileName, async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Upload file to Aspose cloud storage
            await cadApi.uploadFile(fileName, data);
            
            // Convert file to .glb format
            const request = new CadApi.PostDrawingSaveAsRequest({
                name: fileName,
                outputFormat: 'glb',
                folder: '', // Folder where the file was uploaded, or empty if root
            });

            const result = await cadApi.postDrawingSaveAs(request);
            console.log('File converted successfully:', result);
        } catch (error) {
            console.error('Error during conversion:', error);
        }
    });
}
