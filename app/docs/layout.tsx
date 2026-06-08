import Container from '@/components/shared/Container'
import Sidebar from '@/components/layout/Sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-24 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-72 lg:shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </div>
  )
}