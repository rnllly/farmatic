import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { useDebounce } from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { useEffect, useState } from "react";
import { PlantLibraryList } from "../sections/plant-library-list";

export const LibraryScreen = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [page, setPage] = useState(1);
  const [plants, setPlants] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading } = useFetch(
    () => getPlants(debouncedSearch, page),
    [debouncedSearch, page]
  );

  useEffect(() => {
    if (data) {
      const plantsWithImages = data.filter(
        (plant: any) => plant.default_image?.thumbnail
      );

      if (page === 1) {
        setPlants(plantsWithImages);
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
      }, 500);
    }
  };

  return (
    <MainLayout>
      <Header title="Plant Library" description="Browse our plant library">
        <FormInput
          iconName="Search"
          placeholder="Search for a plant"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setPage(1);
          }}
        />
      </Header>
      <PlantLibraryList
        data={plants}
        loading={loading}
        handleLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />
    </MainLayout>
  );
};
