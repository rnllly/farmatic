import { FormInput } from "@/components/form/form-input";
import { HeaderToo } from "@/components/header-too";
import { MainLayout } from "@/components/layout/main-layout";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { useEffect, useRef, useState } from "react";
import { LibUserGuide } from "../sections/lib-user-guide";
import { PlantLibraryList } from "../sections/plant-library-list";

export const LibraryScreen = () => {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const cache = useRef<Record<string, any[]>>({});

  const [page, setPage] = useState(1);
  const [plants, setPlants] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const {
    data,
    loading,
    error: fetchError,
  } = useFetch(() => getPlants(submittedSearch, page), [submittedSearch, page]);
  const handleImageError = (plantId: number) => {
    setFailedImages((prev) => new Set(prev).add(plantId));
  };
  const [isGuideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to load plants. Please try again.");
      setLoadingMore(false);
      return;
    }
    if (data) {
      const plantsWithImages = data.filter(
        (plant: any) =>
          plant.default_image?.thumbnail &&
          plant.default_image.thumbnail.startsWith("http"),
      );

      if (page === 1) {
        setPlants(plantsWithImages);
        cache.current[submittedSearch] = plantsWithImages;
      } else if (page > 1) {
        setPlants((prev) => [...prev, ...plantsWithImages]);
      }
    }

    setLoadingMore(false);
  }, [data, page]);

  const handleLoadMore = () => {
    if (!loadingMore && data?.length > 0 && !loading) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 1500);
    }
  };

  const openGuide = () => {
    setGuideOpen(true);
  };

  return (
    <MainLayout>
      <HeaderToo
        title="Plant Library"
        description="Browse our plant library"
        rightIcon="CircleQuestionMark"
        onRightIconPress={openGuide}
      >
        <FormInput
          iconName="Search"
          placeholder="Search for a plant"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => {
            if (loading) return;
            setError(null);
            setPage(1);
            if (cache.current[search]) {
              setPlants(cache.current[search]);
              setSubmittedSearch(search);
              return;
            }

            setSubmittedSearch(search);
          }}
        />
      </HeaderToo>
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg m-4">{error}</div>
      )}
      <LibUserGuide visible={isGuideOpen} onClose={() => setGuideOpen(false)} />
      <PlantLibraryList
        data={plants.filter((plant) => !failedImages.has(plant.id))}
        loading={loading}
        handleLoadMore={handleLoadMore}
        loadingMore={loadingMore}
        onImageError={handleImageError}
      />
    </MainLayout>
  );
};
