"use client";
import React from "react";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

const breadcrumbs: Record<string, string> = {
  dashboard: "Anasayfa",
  sims: "SIM Hatlar",
  devices: "Cihazlar",
  users: "Satış Temsilcileri",
  customers: "Müşteriler",
  create: "Ekle",
  edit: "Düzenle",
};

export default function MyBreadcrumb() {
  const path = usePathname();
  const paths = path.split("/").filter(Boolean);
  const validPaths = paths.filter((path) => breadcrumbs[path]);
  const array: Array<any> = [];

  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        {validPaths.map((path, index) => {
          if (index == validPaths.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{breadcrumbs[path]}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          array.push(path);
          let text = "/" + array.join("/");
          return (
            <React.Fragment key={index}>
              {" "}
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={text}>{breadcrumbs[path]}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < paths.length - 1 && (
                <BreadcrumbSeparator key={"s" + index} />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
