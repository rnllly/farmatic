import { Button } from "@/components/form/button";
import { DatePicker } from "@/components/form/date-picker";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { createPlant } from "@/services/firebase/firestore/plants";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, ToastAndroid } from "react-native";
import { ImagePicker } from "../sections/image-picker";

interface Range {
  min: number;
  max: number;
}
interface Props {
  selectedPlantId?: string;
  selectedPlantName?: string;
  selectedPlantImage?: string;
  selectedPlantMoistureRange?: Range;
  selectedPlantTemperatureRange?: Range;
  selectedPlantHumidityRange?: Range;
  selectedPlantDescription?: string;
}

export const AddPlantScreen = (selectedPlant: Props) => {
  const { adminId } = useAuth();

  const hasSelectedPlant =
    selectedPlant.selectedPlantId &&
    selectedPlant.selectedPlantName &&
    selectedPlant.selectedPlantMoistureRange &&
    selectedPlant.selectedPlantTemperatureRange &&
    selectedPlant.selectedPlantHumidityRange &&
    selectedPlant.selectedPlantDescription &&
    selectedPlant.selectedPlantImage;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      name: hasSelectedPlant ? (selectedPlant.selectedPlantName as string) : "",
      imageUrl: hasSelectedPlant
        ? (selectedPlant.selectedPlantImage as string)
        : "",
      imageType: "",
      plantedAt: new Date(),
      isChosen: false,
      description: hasSelectedPlant
        ? (selectedPlant.selectedPlantDescription as string)
        : "",
      humidityRange: selectedPlant.selectedPlantHumidityRange ?? {
        min: 0,
        max: 0,
      },
      soilMoistureRange: selectedPlant.selectedPlantMoistureRange ?? {
        min: 0,
        max: 0,
      },
      temperatureRange: selectedPlant.selectedPlantTemperatureRange ?? {
        min: 0,
        max: 0,
      },
    },
  });

  const handleSelectOrCaptureImage = async (mode: "upload" | "capture") => {
    try {
      const result = mode === "upload" ? await pickImage() : await takePhoto();

      if (result) {
        const type = getImageType(result.uri);
        setValue("imageType", type);
        setValue("imageUrl", result.uri);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const onSubmit = async (data: {
    name: string;
    imageUrl: string;
    imageType: string;
    plantedAt: Date;
    isChosen: boolean;
    description: string;
    soilMoistureRange: { min: number; max: number };
    temperatureRange: { min: number; max: number };
    humidityRange: { min: number; max: number };
  }) => {
    try {
      const result = await createPlant(data, adminId);

      if (!result.isSuccess) return Alert.alert("Error", result.message);

      ToastAndroid.show("Plant added successfully", ToastAndroid.SHORT);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Add Plant"
        description={
          hasSelectedPlant
            ? "Add selected plant to your greenhouse"
            : "Add a new plant to your greenhouse"
        }
        showBackButton
      />

      <ScreenContainer scrollable>
        <Controller
          control={control}
          name="imageUrl"
          rules={{ required: "Required" }}
          render={({ field: { value, onChange } }) => (
            <ImagePicker
              value={value}
              onChange={onChange}
              handleImagePicker={() => handleSelectOrCaptureImage("upload")}
              handleTakePhoto={() => handleSelectOrCaptureImage("capture")}
              errors={errors}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Plant name"
              placeholder="Enter plant name"
              value={value}
              onChangeText={onChange}
              iconName="Sprout"
              styles="mb-6"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Description"
              placeholder="Enter plant description"
              value={value}
              onChangeText={onChange}
              iconName="Sprout"
              styles="mb-6"
              error={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="soilMoistureRange.max"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Soil Moisture(Max)"
              placeholder="Enter plant soil moisture"
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              iconName="Sprout"
              styles="mb-6"
              error={errors.soilMoistureRange?.max?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="soilMoistureRange.min"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Soil Moisture(Min)"
              placeholder="Enter plant soil moisture"
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              iconName="Sprout"
              styles="mb-6"
              error={errors.soilMoistureRange?.min?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="humidityRange.max"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Humidity(Max)"
              placeholder="Enter plant humidity"
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              iconName="Sprout"
              styles="mb-6"
              error={errors.humidityRange?.max?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="humidityRange.min"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Humidity(Min)"
              placeholder="Enter plant humidity"
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              iconName="Sprout"
              styles="mb-6"
              error={errors.humidityRange?.min?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="temperatureRange.max"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Temperature(Max)"
              placeholder="Enter plant temperature"
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              iconName="Sprout"
              styles="mb-6"
              error={errors.temperatureRange?.max?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="temperatureRange.min"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Temperature(Min)"
              placeholder="Enter plant temperature"
              value={value.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              iconName="Sprout"
              styles="mb-6"
              error={errors.temperatureRange?.min?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="plantedAt"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Date Planted"
              handleChange={onChange}
              value={value as Date}
              styles="mb-6"
            />
          )}
        />
        <Button
          label="Submit"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </ScreenContainer>
    </MainLayout>
  );
};
