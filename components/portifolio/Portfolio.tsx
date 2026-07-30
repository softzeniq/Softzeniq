import PortfolioCatalog from "./PortfolioCatalog";
import PortfolioHeader from "./PortfolioHeader";

export default function Portfolio() {
  return (
    <>
      <PortfolioHeader />
      <PortfolioCatalog projects={[]} categories={[]} />
    </>
  );
}
