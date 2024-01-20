type ExtraInfoProps = {
  abv: number;
  ph: number;
  ibu: number;
  ebc: number;
  srm: number;
  vol: number;
};

export default function ExtraInfo({
  abv,
  ph,
  ibu,
  ebc,
  srm,
  vol,
}: ExtraInfoProps) {
  return (
    <div className="mt-6 grid grid-cols-2 items-center justify-center gap-5 md:grid-cols-3">
      <div>
        <span className="font-semibold">ABV</span>
        <p className="text-sm">{abv}%</p>
      </div>
      <div>
        <span className="font-semibold">PH</span>
        <p className="text-sm">{ph}</p>
      </div>
      <div>
        <span className="font-semibold">IBU</span>
        <p className="text-sm">{ibu}</p>
      </div>
      <div>
        <span className="font-semibold">EBC</span>
        <p className="text-sm">{ebc}</p>
      </div>
      <div>
        <span className="font-semibold">SRM</span>
        <p className="text-sm">{srm}</p>
      </div>
      <div>
        <span className="font-semibold">VOL</span>
        <p className="text-sm">{vol}L</p>
      </div>
    </div>
  );
}
