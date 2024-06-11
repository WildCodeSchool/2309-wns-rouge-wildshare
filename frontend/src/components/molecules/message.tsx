import Image from "next/image";

export default function Message() {
  return (
    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
      <Image
        width={40}
        height={40}
        src={"/assets/avatars/jake-nackos.jpg"}
        alt="jake nackos"
        className="mr-3 rounded-circle"
      />
      <div className="message-container px-3 py-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tristique mauris ac sem elementum, vitae volutpat risus elementum. Ut
          ac suscipit odio, eget aliquam nisl. Ut rutrum tempus neque. Donec
          tincidunt quam eget tincidunt pretium. Etiam id metus in odio
          convallis convallis. Sed faucibus urna eget turpis lacinia interdum.
          Sed ac augue vitae metus consectetur facilisis. Curabitur a arcu eget
          purus pellentesque semper in at enim.{" "}
        </p>
      </div>
    </div>
  );
}
