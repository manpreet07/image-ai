import { Button, Card, Layout, Link } from "@shopify/polaris";
import axios from "axios";
import { useEffect, useState } from "react";

const imageAiUrl = "http://localhost:3001";

export async function uploadImage(formData: FormData) {
  const response = await axios.post(imageAiUrl + "/" + "upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState();

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setData(await uploadImage(formData));
    }
  };

  return (
    <Card>
      {!data ? (
        <div>
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      ) : (
        <Layout>
          <div>
            <p>{(data as any)?.data.image.filename}</p>
            <p>{(data as any)?.data.image.width}</p>
            <p>{(data as any)?.data.image.height}</p>
          </div>
          <div>
            <p>{(data as any)?.data.text[0].description}</p>
          </div>
        </Layout>
      )}
    </Card>
  );
}
