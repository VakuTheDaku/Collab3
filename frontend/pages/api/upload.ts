import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export default async function uploadAudioFile(req: any) {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req);

    return new Promise((resolve, reject) => {
      form.on('file', async (name: any, file: any) => {
        try {
          const fileContent = await readFileAsync(file.path);

          // Define the destination path within the 'public' folder
          const destinationPath = path.join(process.cwd(), 'public', 'uploads', file.name);

          // Write the file to the destination path
          await writeFileAsync(destinationPath, fileContent);

          // Resolve with the relative path within the 'public' folder
          resolve(path.join('/public', 'uploads', file.name));
        } catch (error) {
          reject(error);
        }
      });

      form.on('error', (error: any) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error('Error uploading audio file:', error);
    throw error;
  }
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb' // Set desired value here
        }
    }
}