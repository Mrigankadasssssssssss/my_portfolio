/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Form from "@/app/components/Form";
import prisma from "@/app/lib/db";
import { Suspense } from "react";
import LoadingState, { GuestBoxFormLoading } from "@/app/components/LoadingState";

import { unstable_noStore as noStore } from "next/cache";

async function getGuestBoxEntries() {
  noStore();
  const data = await prisma.guestBoxEntry.findMany({
    select: {
      User: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
      message: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return data;
}

export default function GuestBoxPage() {
  return (
    <section className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">GuestBox</h1>
      <p className="text-zinc-400 leading-7 mt-5 ml-2">Sign my GuestBox!</p>

      <Card className="mt-10">
        <CardHeader className="flex flex-col w-full">
          <Label className="mb-1">Message</Label>
          <Suspense  fallback={<GuestBoxFormLoading/>}>
            <GuestBoxForm />
          </Suspense>

          <ul className="pt-7 gap-y-5 flex flex-col">
            <Suspense fallback={<LoadingState/>}>
              <GuestBoxEntries />
            </Suspense>
          </ul>
        </CardHeader>
      </Card>
    </section>
  );
}

async function GuestBoxEntries() {
  const data = await getGuestBoxEntries();

  if (data.length === 0) {
    return <p>No entries yet</p>;
  }

  return (
    <>
      {data.map((item) => (
        <li key={item.id}>
          <div className="flex items-center">
            {item.User?.profileImage && (
              <img
                src={item.User?.profileImage}
                alt="User Profile Image"
                className="w-10 h-10 rounded-lg"
              />
            )}
            <p className="text-muted-foreground pl-3 break-words">
              {item.User?.firstName}:{" "}
              <span className="text-foreground">{item.message}</span>
            </p>
          </div>
        </li>
      ))}
    </>
  );
}

async function GuestBoxForm() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    return <Form />;
  }

  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <Input type="text" placeholder="Type Your feelings...☺☺" />
      <RegisterLink>
        <Button className="w-full">Sign for free</Button>
      </RegisterLink>
    </div>
  );
}
