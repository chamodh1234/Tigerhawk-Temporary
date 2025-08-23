import React from 'react'
import Image1 from '@/public/hero-section-image.jpg'
import Image2 from '@/public/camping.jpg'
import Image3 from '@/public/man-walking-with-lantern-woods.jpg'
import Image4 from '@/public/seeking-your-input-for-our-upcoming-ec500-long-range-v0-o2otujj0c6zc1.png'
import Image5 from '@/public/side-view-woman-holding-flashlight.jpg'
import Image6 from '@/public/s-l1200.jpg'
import Image from 'next/image'

const Categories = [
    {
        name: 'Camping',
        image: Image1,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image2,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image3,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image4,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image5,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image6,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },






]

const BeniftsSection = () => {
    return (
        <section className="relative w-full bg-gray-100 dark:bg-card/80 py-20 overflow-hidden">
            {/* Repeating watermark background with TIGER HAWK name only */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 z-0"
                style={{
                    opacity: 0.10,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '340px 180px',
                    backgroundPosition: '0 0',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg width='340' height='180' xmlns='http://www.w3.org/2000/svg'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-size='38' font-family='Arial' fill='rgb(180,180,180)' opacity='0.85' transform='rotate(-20 170 90)'>TIGER HAWK</text></svg>")`,
                }}
            />
            <div className="relative flex flex-col wrapper items-center justify-center z-10">
                <p className="flex wrapper mt-20 text-[70px] font-bold">
                    HOW IT WORKS
                </p>
                <p className="flex wrapper text-[14px] text-gray-500">
                    We are a team of passionate individuals who are dedicated to providing the best possible experience for our customers.
                </p>
                <div className="grid w-full xl:max-w-[1400px] xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-3 mt-20">
                    {Categories.map((category, index) => (
                        <div
                            key={index}
                            className="relative group w-full h-[600px] shadow-lg rounded-[25px] bg-white dark:bg-card transition-colors"
                        >
                            {category.image && (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    className="object-cover object-top w-full h-full rounded-[25px]"
                                    fill
                                />
                            )}
                            <div className="absolute bottom-0 z-10 left-0 w-full rounded-[25px]">
                                <div
                                    className="
                                        relative
                                        flex
                                        justify-center
                                        items-end
                                        primay-color-bg
                                        rounded-b-[22px]
                                        w-full
                                        h-[100px]
                                        group-hover:h-[600px]
                                        group-hover:rounded-t-[22px]
                                        transition-all
                                        opacity-80
                                        duration-700
                                        cursor-pointer
                                        overflow-hidden
                                    "
                                >
                                    <p
                                        className="
                                            w-full
                                            text-[20px]
                                            font-bold
                                            text-black
                                            opacity-100
                                            group-hover:hidden
                                            transition-all
                                            duration-300
                                            flex
                                            items-center
                                            justify-center
                                            h-full
                                        "
                                    >
                                        {category.name}
                                    </p>
                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            w-full
                                            px-4
                                            py-6
                                            text-[14px]
                                            text-black
                                            opacity-0
                                            group-hover:opacity-100
                                            rounded-[25px]
                                            transition-all
                                            duration-500
                                            h-full
                                            flex
                                            items-center
                                            justify-center
                                            text-justify
                                        "
                                    >
                                        {category.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default BeniftsSection