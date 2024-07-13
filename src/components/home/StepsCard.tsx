import { ReactNode } from "react";
import useColors from "../../hooks/useColor";
import { Paper } from "@mui/material";

export default function StepsCard({
  icon,
  title,
  description,
  firstCard,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  firstCard: boolean;
}) {
  const { info } = useColors();

  return (
    <Paper
      elevation={3}
      className="flex-col p-5 max-w-[300px] md:text-left text-center"
    >
      <div className="my-3">{icon}</div>
      <h1
        className="font-bold text-lg mb-3"
        style={{ color: firstCard ? info : "" }}
      >
        {title}
      </h1>
      <p className="tracking-wide">{description}</p>
    </Paper>
  );
}
