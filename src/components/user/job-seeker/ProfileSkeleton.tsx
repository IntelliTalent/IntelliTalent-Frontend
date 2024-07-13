import { Container, Divider, Skeleton } from "@mui/material";

export default function ProfileSkeleton() {
  return (
    <Container sx={{ p: 3 }}>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Skeleton variant="circular" width={100} height={100} />
          <div>
            <Skeleton width={200} height={50} />
            <Skeleton width={200} height={25} />
          </div>
        </div>

        <div className="flex flex-col">
          <Skeleton width={200} height={55} />
          <Skeleton width={200} height={55} />
        </div>
      </div>
      <div className="pt-5">
        <Skeleton width={200} height={30} />
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
      </div>

      <Divider sx={{ my: 3 }} />
      <Divider sx={{ mt: 5 }} />

      <div className="flex justify-between">
        <Skeleton width="60%" />
        <Skeleton width={300} height={300} />
      </div>
    </Container>
  );
}
