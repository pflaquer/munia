import { cn } from '@/lib/cn';

interface LogoTextProps extends React.HTMLAttributes<HTMLHeadElement> {}
export function LogoText({ ...rest }: LogoTextProps) {
  return (
    <h1
      {...rest}
      className={cn(
        'cursor-pointer bg-clip-text font-bold text-transparent',
        rest.className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(95.08deg, #AE5388 2.49%, #3D1052 97.19%)',
      }}
    >
      Munia
    </h1>
  );
}
