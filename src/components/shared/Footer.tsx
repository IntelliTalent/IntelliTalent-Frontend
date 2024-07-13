import useColors from "../../hooks/useColor";

function Footer({ hide }: { hide: boolean }) {
  const { mode } = useColors();

  return (
    <>
      <div className="flex-1 mt-10" />{" "}
      {/* Empty div to push footer to the bottom */}
      <footer
        hidden={hide}
        className="text-center p-3"
        style={{
          borderTop: mode === "dark" ? "1px solid #fff" : "1px solid #000",
        }}
      >
        <p>&copy; 2024 Intelli-Talent</p>
      </footer>
    </>
  );
}

export default Footer;
