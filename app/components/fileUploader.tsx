import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const fileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "application/pdf": [".pdf"],
      },
      maxSize: 5 * 1024 * 1024, // 5MB
    });

  const file = acceptedFiles[0] || null;

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }

  return (
    <div className=" w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className=" space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex items-center space-x-6 ">
                <img src="./images/pdf.png" alt="pdf" className="size-10" />
                <div>
                  <p className="text-lg text-gray-500">
                    {file.name.slice(0, 100)}
                  </p>
                  <p className="text-lg text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
                <button
                  className=" p-2 cursor-pointer"
                  onClick={(e) => {
                    onFileSelect?.(null);
                  }}
                >
                  <img
                    src="./icons/cross.svg"
                    alt="remove"
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="./icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload </span>
                or drag and drop a file here
              </p>
              <p className="text-lg text-gray-500">
                PDF (max {formatSize(5 * 1024 * 1024)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default fileUploader;
