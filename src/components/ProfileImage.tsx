type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function ProfileImage({ src, alt, className = "" }: Props) {
  return (
    <div className="msn-profile p-2.5">
      <div
        className={`border border-gray-300 w-[90px] h-[90px] flex items-center justify-center p-1 ${className}`}
        title={alt}
      >
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain block" />
      </div>
    </div>
  );
}
