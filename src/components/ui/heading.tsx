import { cn } from '@/lib/utils'

type HeadingProps =
  | {
      title: string
      description?: string
      centered?: boolean
    }
  | {
      title?: string
      description: string
      centered?: boolean
    }

export const Heading: React.FC<HeadingProps> = ({ title, centered, description }) => {
  return (
    <div className={cn({ 'text-center': centered })}>
      {title && (
        <h2 className="font-special text-2xl font-bold tracking-tight text-primary md:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground md:text-base">{description}</p>
      )}
    </div>
  )
}
