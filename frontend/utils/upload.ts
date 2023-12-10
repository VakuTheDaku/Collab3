import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export async function uploadAudioFile(file: any, destinationFileName:any) {
  try {
    // Read the file content
    const fileContent = await readFileAsync(file.path);

    // Define the destination path within the 'public' folder
    const destinationPath = path.join(process.cwd(), 'public', destinationFileName);

    // Write the file to the destination path
    await writeFileAsync(destinationPath, fileContent);

    // Return the relative path within the 'public' folder
    return path.join('/public', destinationFileName);
  } catch (error) {
    console.error('Error uploading audio file:', error);
    throw error;
  }
}
