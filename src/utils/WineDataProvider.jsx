export const WineDataProvider = {
    wineById: async (id) => {
      try {
        const request = await fetch(`http://localhost:3001/wines/${id}`, {
          method: "GET",
        });
        const result = await request.json();
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
  };  