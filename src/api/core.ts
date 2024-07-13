import { endpoints, publicRequest, userRequest } from "./axios";

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await publicRequest.post(endpoints.core.upload, formData);
  return response.data;
}

export async function triggerExtractInfo(cvLink: string) {
  const response = await userRequest.post(endpoints.core.triggerExtractInfo, {
    cvLink,
  });
  return response.data;
}

export async function extractInfo() {
  const response = await userRequest.get(endpoints.core.extractInfo);
  return response.data;
}
