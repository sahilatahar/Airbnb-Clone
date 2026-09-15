"use client";

import { useEffect, useState } from "react";
import {
    AllAmenitiesModal,
    AllReviewsModal,
    AmenitiesSection,
    CalendarSection,
    DescriptionSection,
    Footer,
    GuestFavouriteSection,
    HeroGallery,
    KeyHighlights,
    LightboxModal,
    ListingSummary,
    LocationSection,
    MeetYourHost,
    Navbar,
    NearbyStays,
    PhotoTourModal,
    ReviewsSection,
    ShareModal,
    StickyBookingWidget,
    StickyTabBar,
    ThingsToKnow,
    WhereYoullSleep,
} from "@/components";
import { listingData } from "@/data/listingData";

export default function ListingPage() {
    const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedReviewTag, setSelectedReviewTag] = useState<string | null>(null);

    const handleOpenLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    useEffect(() => {
        const isAnyModalOpen =
            isPhotoTourOpen ||
            isLightboxOpen ||
            isAmenitiesModalOpen ||
            isReviewsModalOpen ||
            isShareModalOpen;

        if (isAnyModalOpen) {
            document.body.classList.add("modal-open");
            document.documentElement.classList.add("modal-open");
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.classList.remove("modal-open");
            document.documentElement.classList.remove("modal-open");
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.classList.remove("modal-open");
            document.documentElement.classList.remove("modal-open");
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [
        isPhotoTourOpen,
        isLightboxOpen,
        isAmenitiesModalOpen,
        isReviewsModalOpen,
        isShareModalOpen,
    ]);

    const filteredReviews = selectedReviewTag
        ? listingData.reviews.filter(
              (r) =>
                  r.comment.toLowerCase().includes(selectedReviewTag.toLowerCase()) ||
                  (r.longComment &&
                      r.longComment
                          .toLowerCase()
                          .includes(selectedReviewTag.toLowerCase()))
          ).length > 0
            ? listingData.reviews.filter(
                  (r) =>
                      r.comment.toLowerCase().includes(selectedReviewTag.toLowerCase()) ||
                      (r.longComment &&
                          r.longComment
                              .toLowerCase()
                              .includes(selectedReviewTag.toLowerCase()))
              )
            : listingData.reviews
        : listingData.reviews;

    return (
        <main className="min-h-screen bg-surface-primary text-content-primary">
            <Navbar
                onShareClick={() => setIsShareModalOpen(true)}
                isSaved={isSaved}
                onSaveToggle={() => setIsSaved(!isSaved)}
                listingTitle={listingData.title}
                rating={listingData.rating}
                reviewsCount={listingData.reviewsCount}
            />

            <StickyTabBar data={listingData} />

            <HeroGallery
                photos={listingData.photos}
                title={listingData.title}
                onOpenPhotoTour={() => setIsPhotoTourOpen(true)}
                onOpenLightbox={handleOpenLightbox}
                onShareClick={() => setIsShareModalOpen(true)}
                isSaved={isSaved}
                onSaveToggle={() => setIsSaved(!isSaved)}
            />

            <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-10">
                <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <ListingSummary
                            data={listingData}
                            onShowAllReviews={() => setIsReviewsModalOpen(true)}
                        />
                        <KeyHighlights highlights={listingData.highlights} />
                        <DescriptionSection data={listingData} />
                        <WhereYoullSleep
                            arrangements={listingData.sleepingArrangements}
                            onSelectPhoto={handleOpenLightbox}
                        />
                        <AmenitiesSection
                            onShowAllAmenities={() => setIsAmenitiesModalOpen(true)}
                        />
                        <CalendarSection
                            locationName={listingData.locationDetails.city}
                        />
                    </div>

                    <div className="relative hidden lg:col-span-5 lg:block xl:col-span-4">
                        <StickyBookingWidget data={listingData} />
                    </div>
                </div>

                <GuestFavouriteSection
                    data={listingData}
                    selectedTag={selectedReviewTag}
                    onSelectTag={setSelectedReviewTag}
                />

                <ReviewsSection
                    reviews={filteredReviews}
                    onShowAllReviews={() => setIsReviewsModalOpen(true)}
                />

                <LocationSection location={listingData.locationDetails} />
                <MeetYourHost host={listingData.host} />
                <ThingsToKnow data={listingData.thingsToKnow} />
                <NearbyStays stays={listingData.nearbyStays} />
            </div>

            <Footer />

            <PhotoTourModal
                isOpen={isPhotoTourOpen}
                onClose={() => setIsPhotoTourOpen(false)}
                photos={listingData.photos}
                tourCategories={listingData.tourCategories}
                onSelectPhoto={(idx) => {
                    handleOpenLightbox(idx);
                }}
                onShareClick={() => setIsShareModalOpen(true)}
                isSaved={isSaved}
                onSaveToggle={() => setIsSaved(!isSaved)}
            />

            <LightboxModal
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                photos={listingData.photos}
                currentIndex={lightboxIndex}
                onNavigate={setLightboxIndex}
                onShareClick={() => setIsShareModalOpen(true)}
                isSaved={isSaved}
                onSaveToggle={() => setIsSaved(!isSaved)}
            />

            <AllAmenitiesModal
                isOpen={isAmenitiesModalOpen}
                onClose={() => setIsAmenitiesModalOpen(false)}
                categories={listingData.amenityCategories}
            />

            <AllReviewsModal
                isOpen={isReviewsModalOpen}
                onClose={() => setIsReviewsModalOpen(false)}
                reviews={listingData.reviews}
                rating={listingData.rating}
                reviewsCount={listingData.reviewsCount}
            />

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                data={listingData}
            />
        </main>
    );
}
