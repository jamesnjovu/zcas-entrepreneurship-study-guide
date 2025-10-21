import UnitCard from './UnitCard';

const HomeView = ({ units, onUnitSelect }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} onSelect={onUnitSelect} />
      ))}
    </div>
  );
};

export default HomeView;