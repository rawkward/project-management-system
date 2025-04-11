import { Skeleton, Box } from '@mui/material';

export const IssueCardSkeleton = () => (
  <Box sx={{ p: 2, mb: 2, border: '1px solid #ddd', borderRadius: 2 }}>
    <Skeleton variant="text" width="60%" height={24} />
    <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      <Skeleton variant="rectangular" width={80} height={24} />
      <Skeleton variant="rectangular" width={100} height={24} />
    </Box>
  </Box>
);