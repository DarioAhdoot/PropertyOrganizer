import { Storage } from 'aws-amplify';

export function uploadMedia(
  content: string,
  fileKey: string,
  progressCallback: (progress: any) => void,
  completeCallback: (event?: any, error?: Error) => void) {

  Storage.put(fileKey, content, {
    progressCallback,
  }).then(async (event) => {
    completeCallback(event);
  }).catch((e) => {
    completeCallback(undefined, e);
  });
}

