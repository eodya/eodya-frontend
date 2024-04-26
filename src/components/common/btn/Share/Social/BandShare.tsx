export default function BandShare({ children }: { children: React.ReactNode }) {
  const currentUrl = window.location.href;

  const onClick = () => {
    window.open(`https://band.us/plugin/share?body=어댜&route=${currentUrl}`);
  };

  return <button onClick={onClick}>{children}</button>;
}
