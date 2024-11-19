import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function SearchProductsSales() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleSeachValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleProductChoice = (id: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/details/${id}/id`,{
      headers: {
        "Content-type": "application/json",
        Authorization: import.meta.env.VITE_API_TOKEN,
      },
    })
      .then(response => response.json())
      .then(response => console.log(response))
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setSearchResults({});
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/products/search?q=${searchValue}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: import.meta.env.VITE_API_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [searchValue]);

  return (
    <div className="w-full relative">
      <div className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchValue}
            onChange={handleSeachValue}
            onFocus={() => setIsOpen(true)}
            placeholder="Procurar produto..."
            className="focus-visible:ring-0 pl-8 bg-white"
          />
        </div>
      </div>

      {isOpen && searchValue && (
        <div ref={dropDownRef} className="w-full p-2 border rounded-md bg-white absolute z-10">
          {Object.keys(searchResults).length > 0 ? (
            <div>
              {Object.entries(searchResults).map(([id, name]) => (
                <Button
                  key={id}
                  className="w-full py-1 px-2 hover:bg-gray-100 justify-start cursor-pointer"
                  variant={"ghost"}
                  onClick={() => handleProductChoice(id)}
                >
                  {name}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum resultado encontrado</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchProductsSales;
