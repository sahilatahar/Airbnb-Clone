"use client";

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
import { useScrollLock } from "@/hooks";
import { useCallback, useMemo, useState } from "react";

export default function ListingPage() {
    const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedReviewTag, setSelectedReviewTag] = useState<string | null>(null);

    const isAnyModalOpen =
        isPhotoTourOpen ||
        isLightboxOpen ||
        isAmenitiesModalOpen ||
        isReviewsModalOpen ||
        isShareModalOpen;

    useScrollLock(isAnyModalOpen);

    const handleOpenLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    }, []);

    const handleOpenPhotoTour = useCallback(() => setIsPhotoTourOpen(true), []);
    const handleClosePhotoTour = useCallback(() => setIsPhotoTourOpen(false), []);
    const handleCloseLightbox = useCallback(() => setIsLightboxOpen(false), []);
    const handleOpenAmenities = useCallback(() => setIsAmenitiesModalOpen(true), []);
    const handleCloseAmenities = useCallback(() => setIsAmenitiesModalOpen(false), []);
    const handleOpenReviews = useCallback(() => setIsReviewsModalOpen(true), []);
    const handleCloseReviews = useCallback(() => setIsReviewsModalOpen(false), []);
    const handleOpenShare = useCallback(() => setIsShareModalOpen(true), []);
    const handleCloseShare = useCallback(() => setIsShareModalOpen(false), []);
    const handleToggleSaved = useCallback(() => setIsSaved((prev) => !prev), []);

    const filteredReviews = useMemo(() => {
        if (!selectedReviewTag) return listingData.reviews;
        const query = selectedReviewTag.toLowerCase();
        const matches = listingData.reviews.filter(
            (r) =>
                r.comment.toLowerCase().includes(query) ||
                r.longComment?.toLowerCase().includes(query)
        );

        return matches.length > 0 ? matches : listingData.reviews;
    }, [selectedReviewTag]);

    return (
        <main className="min-h-screen bg-surface-primary text-content-primary">
            <Navbar
                onShareClick={handleOpenShare}
                isSaved={isSaved}
                onSaveToggle={handleToggleSaved}
                listingTitle={listingData.title}
                rating={listingData.rating}
                reviewsCount={listingData.reviewsCount}
            />
            <StickyTabBar data={listingData} />
            <HeroGallery
                photos={listingData.photos}
                title={listingData.title}
                onOpenPhotoTour={handleOpenPhotoTour}
                onOpenLightbox={handleOpenLightbox}
                onShareClick={handleOpenShare}
                isSaved={isSaved}
                onSaveToggle={handleToggleSaved}
            />
            <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-10">
                <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <ListingSummary
                            data={listingData}
                            onShowAllReviews={handleOpenReviews}
                        />
                        <KeyHighlights highlights={listingData.highlights} />
                        <DescriptionSection data={listingData} />
                        <WhereYoullSleep
                            arrangements={listingData.sleepingArrangements}
                            onSelectPhoto={handleOpenLightbox}
                        />
                        <AmenitiesSection onShowAllAmenities={handleOpenAmenities} />
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
                    onShowAllReviews={handleOpenReviews}
                />
                <LocationSection location={listingData.locationDetails} />
                <MeetYourHost host={listingData.host} />
                <ThingsToKnow data={listingData.thingsToKnow} />
                <NearbyStays stays={listingData.nearbyStays} />
            </div>
            <Footer />
            <PhotoTourModal
                isOpen={isPhotoTourOpen}
                onClose={handleClosePhotoTour}
                photos={listingData.photos}
                tourCategories={listingData.tourCategories}
                onSelectPhoto={handleOpenLightbox}
                onShareClick={handleOpenShare}
                isSaved={isSaved}
                onSaveToggle={handleToggleSaved}
            />
            <LightboxModal
                isOpen={isLightboxOpen}
                onClose={handleCloseLightbox}
                photos={listingData.photos}
                currentIndex={lightboxIndex}
                onNavigate={setLightboxIndex}
                onShareClick={handleOpenShare}
                isSaved={isSaved}
                onSaveToggle={handleToggleSaved}
            />
            <AllAmenitiesModal
                isOpen={isAmenitiesModalOpen}
                onClose={handleCloseAmenities}
                categories={listingData.amenityCategories}
            />
            <AllReviewsModal
                isOpen={isReviewsModalOpen}
                onClose={handleCloseReviews}
                reviews={listingData.reviews}
                rating={listingData.rating}
                reviewsCount={listingData.reviewsCount}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={handleCloseShare}
                data={listingData}
            />
        </main>
    );
}
