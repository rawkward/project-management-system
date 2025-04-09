import { ReactNode } from "react";
import {Box, Modal as MuiModal} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type TModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ open, onClose, children }: TModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {children}
      </Box>
    </MuiModal>
  );
};
