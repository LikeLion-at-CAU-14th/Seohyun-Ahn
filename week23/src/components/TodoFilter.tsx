import styled from 'styled-components';

export type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  filterType: FilterType;
  onFilterChange: (filterType: FilterType) => void;
}

export default function TodoFilter({
  filterType,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <FilterContainer>
      <FilterButton
        $active={filterType === "all"}
        onClick={() => onFilterChange("all")}
      >
        전체
      </FilterButton>

      <FilterButton
        $active={filterType === "active"}
        onClick={() => onFilterChange("active")}
      >
        진행 중
      </FilterButton>

      <FilterButton
        $active={filterType === "completed"}
        onClick={() => onFilterChange("completed")}
      >
        완료
      </FilterButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${({ $active }) =>
    $active ? '#ff6b35' : '#e0e0e0'};
  background-color: ${({ $active }) =>
    $active ? '#ff6b35' : '#ffffff'};
  color: ${({ $active }) =>
    $active ? '#ffffff' : '#666666'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #ff6b35;
  }
`;