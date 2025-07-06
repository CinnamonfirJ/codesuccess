import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type AdProps = {
  image?: string;
  title?: string;
  description?: string;
  link?: string;
};

export default function AdCard({ image, title, description, link }: AdProps) {
  const isEmpty = !title || !description || !image || !link;

  if (isEmpty) {
    return (
      <Card className='bg-gradient-to-br from-slate-100 to-slate-200 shadow p-8 border-0 text-center'>
        <CardHeader className='flex flex-col items-center'>
          <div className='flex justify-center items-center bg-slate-300 mx-auto mb-3 rounded-full w-12 h-12'>
            <Clock className='w-6 h-6 text-slate-600' />
          </div>
          <h2 className='font-semibold text-slate-700 text-xl'>
            Content Coming Soon
          </h2>
          <p className='mt-1 text-slate-500 text-sm'>
            Stay tuned for exciting promotions and opportunities.
          </p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className='bg-gradient-to-br from-orange-500 to-pink-500 shadow-xl border-0 overflow-hidden text-white'>
      <CardHeader className='p-4 text-center'>
        <div className='flex justify-center items-center bg-white/20 mx-auto mb-2 rounded-full w-12 h-12'>
          <Zap className='w-6 h-6' />
        </div>
        <h2 className='font-bold text-xl'>{title}</h2>
        <p className='text-orange-100 text-sm'>{description}</p>
      </CardHeader>
      <CardContent className='p-0'>
        <Image
          src={image}
          alt={title}
          width={600}
          height={300}
          className='w-full h-40 object-cover'
        />
        <div className='p-4 text-center'>
          <Link href={link} target='_blank'>
            <Button className='bg-white hover:bg-orange-100 mt-2 text-orange-600'>
              Learn More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
