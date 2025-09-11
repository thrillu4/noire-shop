'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SlashIcon } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.length > 0 && (
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
        )}

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')
          const isLast = index === segments.length - 1

          const label = decodeURIComponent(segment)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    className="max-w-[100px] truncate"
                    title={label}
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="max-w-[100px] truncate"
                    title={label}
                  >
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
