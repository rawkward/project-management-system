import {Box, Skeleton} from "@mui/material";

export const SelectSkeleton = () => (
  <Box sx={{ mt: 2, mb: 1 }}>
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
  </Box>
);