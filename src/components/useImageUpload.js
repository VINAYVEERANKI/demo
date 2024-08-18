import { useState } from 'react';

export function useHandlePendingFrontFileChange(UploadBgverifPicAction, dispatch, onUploadSuccess, onUploadError) {
  const [pendingFrontFile, setPendingFrontFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handlePendingFrontFileChange = (e) => {
    if (e.target?.files.length !== 0) {
      setPendingFrontFile(URL.createObjectURL(e.target.files[0]));
      setUploadLoading(true);
      dispatch(
        UploadBgverifPicAction(
          e.target.files[0],
          onUploadSuccess,
          onUploadError
        )
      );
    }
  };

  return [pendingFrontFile, uploadLoading, handlePendingFrontFileChange];
}