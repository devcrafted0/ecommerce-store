"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

type Props = {
  images: string[];                     // array of image urls
  height?: string | number;             // e.g. 220 or "22rem" or "20vh"
  gap?: number;                         // px space between cards
  className?: string;
};

export default function ImageSwiper({
  images,
  height = 240,
  gap = 12,
  className,
}: Props) {
  const heightValue = typeof height === "number" ? `${height}px` : height;

  return (
    <>
      <Swiper
        modules={[FreeMode, Mousewheel]}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.85,
          momentumVelocityRatio: 0.9,
          sticky: false,
        }}
        grabCursor={true}
        slidesPerView={"auto"}
        spaceBetween={gap}
        watchOverflow={true}            // if not enough slides, swiper disables interactions gracefully
        className={`!overflow-x-hidden image-swiper ${className ?? ""}`}
        style={{
          height: heightValue,
          padding: "6px 12px",
          boxSizing: "border-box",
          overflow: "visible",          // ensure Swiper itself hides native scrollbars
        }}
        // optional tuning:
        touchStartPreventDefault={false}
        mousewheel={{ forceToAxis: false, invert: false, releaseOnEdges: true }}
      >
        {images.map((src, i) => (
          <SwiperSlide
            key={i}
            style={{
              width: "auto",           // let slide width be computed from content (image natural width scaled to fixed height)
              height: heightValue,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="image-card"
              style={{
                height: "100%",
                display: "block",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                background: "var(--card-bg, #fff)",
              }}
            >
              {/* Next/Image requires width/height — we constrain via CSS so it scales to the fixed height */}
              <Image
                src={src}
                alt={`slide-${i}`}
                width={800}
                height={600}
                draggable={false}
                priority={i < 2} // optional: prioritize first images
                sizes="(max-width: 768px) 60vw, (max-width:1200px) 40vw, 20vw"
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scoped styles for the component */}
      <style jsx>{`
        /* ensure wrapper aligns center and hides any native scrollbar */
        :global(.image-swiper) {
          --gap: ${gap}px;
        }

        /* center slides vertically */
        :global(.image-swiper .swiper-wrapper) {
          align-items: center;
        }

        /* force slide width auto (Swiper sometimes overrides width) */
        :global(.image-swiper .swiper-slide) {
          width: auto !important;
          height: ${heightValue} !important;
        }

        /* hide any accidental native scrollbars */
        :global(.image-swiper::-webkit-scrollbar) {
          display: none;
        }
        :global(.image-swiper) {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* responsive tweaks (reduce gap on small screens) */
        @media (max-width: 768px) {
          :global(.image-swiper) {
            padding-left: 8px;
            padding-right: 8px;
          }
          :global(.image-swiper .swiper-slide) {
            height: ${Math.max(120, Number(String(height).replace("px", "")) * 0.75)}px !important;
          }
        }

        /* optional: improve pointer cursors */
        :global(.image-swiper .swiper-wrapper) {
          cursor: grab;
        }
        :global(.image-swiper .swiper-wrapper:active) {
          cursor: grabbing;
        }
      `}</style>
    </>
  );
}
