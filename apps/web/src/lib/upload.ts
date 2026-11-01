import { PresignUploadResponseSchema } from '@garmentgate/shared';
import { apiJson } from './api';

/**
 * Direct-to-storage upload: ask the API for a presigned POST, then send the bytes straight to
 * object storage (XHR, for progress). Returns the reserved file id to attach afterwards.
 */
export async function uploadFile(
  presignPath: string,
  purpose: string,
  file: File,
  onProgress: (percent: number) => void,
): Promise<string> {
  const presign = await apiJson(presignPath, PresignUploadResponseSchema, {
    method: 'POST',
    body: { purpose, fileName: file.name, contentType: file.type, sizeBytes: file.size },
  });

  const form = new FormData();
  for (const [key, value] of Object.entries(presign.fields)) form.append(key, value);
  form.append('file', file); // must be last

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', presign.url);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error('Upload failed'));
    xhr.send(form);
  });
  return presign.fileId;
}
