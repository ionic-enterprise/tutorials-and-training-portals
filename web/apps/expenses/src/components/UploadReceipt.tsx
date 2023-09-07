import { Close, CloudUpload } from "@mui/icons-material";
import { Button, FormLabel, IconButton, Sheet } from "@mui/joy";
import { Camera, CameraResultType } from "@capacitor/camera";

interface Props {
  receipt?: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

export const UploadReceipt: React.FC<Props> = ({ receipt, onChange }) => {
  const setImage = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      webUseInput: true,
      resultType: CameraResultType.Base64,
    });
    onChange({
      target: {
        name: "receipt",
        value: `data:image/png;base64,${image.base64String}`,
      },
    });
  };

  const uploadView = () => (
    <Button
      startDecorator={<CloudUpload />}
      color="neutral"
      variant="plain"
      size="lg"
      onClick={() => setImage()}
    >
      Upload Receipt
    </Button>
  );

  const displayView = (src: string) => (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        borderRadius: 8,
      }}
    >
      <img
        src={src}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 8,
        }}
      />
      <IconButton
        sx={{
          zIndex: 1001,
          top: 10,
          right: 10,
          position: "absolute",
          borderRadius: 100,
        }}
        variant="solid"
        color="primary"
        size="sm"
        onClick={() => onChange({ target: { name: "receipt", value: "" } })}
      >
        <Close />
      </IconButton>
    </div>
  );

  return (
    <>
      <FormLabel>Receipt</FormLabel>
      <Sheet
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          mt: 1,
          height: "200px",
          position: "relative",
        }}
      >
        {!receipt ? uploadView() : displayView(receipt)}
      </Sheet>
    </>
  );
};
