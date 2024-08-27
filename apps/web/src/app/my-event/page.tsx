import Link from 'next/link';
export default function Myevent() {
  return (
    <section className="relative w-full">
      <div className="relative mx-auto lg:w-[90%] lg:h-screen shadow-md shadow-slate-500">
        <div className="container h-full bg-slate-50">
          <div className="w-full px-4 lg:mb-10 lg:mt-12">
            <h1 className="text-[35px] text-black font-medium py-[35px]">
              My Event
            </h1>
            <div className="border"></div>
            <div className="mt-2">
              <h1 className="text-center text-xl">Event List</h1>
            </div>
          </div>
          {/* --start-- */}

          <div className=" m-5">
            <table className="table mx-2 grid-flow-row">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Event Name</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Seat Capacity</th>
                  <th>Price Set</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>1</td>
                  <td>
                    <div className="font-bold hover:link">
                      <Link href={'/event-details'}>Afgan Comeback Live</Link>
                    </div>
                  </td>
                  <td>Jakarta</td>
                  <td>10 September 2024 / 19:00 WIB</td>
                  <td>50 / 100</td>
                  <td>Rp. 500.000,-</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      <Link href={'/event-details'}>edit</Link>
                    </button>
                  </th>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>2</td>
                  <td>
                    <div className="font-bold hover:link">
                      <Link href={'/event-details'}>
                        Ed Sheeran Live In Bandung
                      </Link>
                    </div>
                  </td>
                  <td>Bandung</td>
                  <td>8 December 2024 / 19:00 WIB</td>
                  <td>65 / 100</td>
                  <td>Rp. 2.500.000,-</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      <Link href={'/event-details'}>edit</Link>
                    </button>
                  </th>
                </tr>
                {/* row 3 */}
                <tr>
                  <td>3</td>
                  <td>
                    <div className="font-bold hover:link">
                      <Link href={'/event-details'}>
                        Rizky Febian Bandung Love Story
                      </Link>
                    </div>
                  </td>
                  <td>Bandung</td>
                  <td>10 Oktober 2024 / 17:00 WIB</td>
                  <td>120 / 200</td>
                  <td>FREE</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      <Link href={'/event-details'}>edit</Link>
                    </button>
                  </th>
                </tr>
              </tbody>
              {/* foot */}
            </table>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-center pt-10">
            <Link href={'save'}>  {/*Send to Back End*/}
            <button
              type="button"
              className="text-white bg-Dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            </Link>
          </div>

          {/* --end-- */}
        </div>
      </div>
    </section>
  );
}
