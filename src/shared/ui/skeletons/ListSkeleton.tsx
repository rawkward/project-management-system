import { Skeleton } from "@mui/material";

export const ListSkeleton = ({ count = 5 }: { count?: number }) => (
  <div>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        width="100%"
        height={72}
        sx={{ mb: 2, borderRadius: 2 }}
      />
    ))}
  </div>
);
