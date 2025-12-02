import { Timezone } from "../../types";

export interface TimezoneSelectorProps {
    timezones: Timezone[];
    selectedTimezone: Timezone | null;
    onSelect: (timezone: Timezone) => void;
    loading?: boolean;
    error?: string | null;
  }

export interface TimezoneSelectorItemProps {
    item: Timezone;
    isSelected: boolean;
    onPress: (timezone: Timezone) => void;
  }