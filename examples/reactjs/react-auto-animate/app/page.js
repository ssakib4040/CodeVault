"use client";

import { useEffect, useRef, useState } from "react";
import autoAnimate, { getTransitionSizes } from "@formkit/auto-animate";

export default function Home() {
  const parent = useRef(null);
  const viewedUsersRefs = useRef({});

  const [items, setItems] = useState([
    {
      id: 0,
      value: "item 0",
      seenBy: [
        {
          id: 1,
          name: "user 1",
          image: "https://picsum.photos/seed/picsum/50/50",
        },
      ],
    },
    {
      id: 1,
      value: "item 1",
      seenBy: [
        {
          id: 1,
          name: "user 1",
          image: "https://picsum.photos/seed/picsum/50/51",
        },
      ],
    },
    {
      id: 2,
      value: "item 3",
      seenBy: [
        {
          id: 1,
          name: "user 1",
          image: "https://picsum.photos/seed/picsum/50/52",
        },
      ],
    },
  ]);

  const add = () => {
    const randomNumber = Math.floor(Math.random() * 100);

    setItems([
      ...items,
      {
        id: items.length,
        value: `item ${items.length}`,
        seenBy: [
          {
            id: items.length + 1,
            name: "user 1",
            image: `https://picsum.photos/seed/picsum/50/${randomNumber}`,
          },
        ],
      },
    ]);
  };

  const remove = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  const handleAddSeenBy = (id) => {
    const randomNumber = Math.floor(Math.random() * 100);

    const newItems = items.map((item) => {
      if (item.id === id) {
        item.seenBy = [
          ...item.seenBy,
          {
            id: item.seenBy.length + 1,
            name: "user 1",
            image: `https://picsum.photos/seed/picsum/50/5${randomNumber}`,
          },
        ];
      }
      return item;
    });
    setItems(newItems);
  };

  const handleRemoveSeenByRandom = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.seenBy = item.seenBy.slice(0, -1);
      }
      return item;
    });
    setItems(newItems);
  };

  function animateFunction(el, action, oldCoords, newCoords) {
    let keyframes;
    if (action === "add") {
      keyframes = [
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1.2)", opacity: 1 },
        { transform: "scale(1)", opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { transform: "scale(1.2)", opacity: 1 },
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0)", opacity: 0 },
      ];
    }
    return new KeyframeEffect(el, keyframes, {
      duration: 300,
      easing: "ease-out",
    });
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    Object.values(viewedUsersRefs.current).forEach((ref) => {
      ref && autoAnimate(ref, animateFunction);
    });
  }, [items]);

  return (
    <div className="border border-gray-600 rounded-lg m-3 p-3 max-w-80">
      <div ref={parent}>
        {items.map((item) => (
          <div key={item.id} className="mb-3">
            <div className="border border-gray-600 flex justify-between items-center p-3">
              <div>
                {item.value}{" "}
                <button
                  className="btn"
                  onClick={() => handleAddSeenBy(item.id)}
                >
                  +
                </button>{" "}
                <button
                  className="btn red"
                  onClick={() => handleRemoveSeenByRandom(item.id)}
                >
                  -
                </button>
              </div>
              <button className="btn red" onClick={() => remove(item)}>
                X
              </button>
            </div>

            <div className="py-3">
              <div className="flex">
                <div
                  className="w-full flex justify-end mr-4 gap-1"
                  ref={(el) => (viewedUsersRefs.current[item.id] = el)}
                >
                  {item.seenBy.map((data) => (
                    <span
                      className="w-4 h-4 rounded-full overflow-hidden cursor-pointer select-none"
                      key={data.id}
                    >
                      <div className="h-4 w-4 bg-gray-700"></div>
                      {/* <img src={data.image} alt="" /> */}
                    </span>
                  ))}

                  {item.seenBy.length > 9 && (
                    <div className="w-4 h-4 rounded-full overflow-hidden bg-gray-800 text-white text-[10px] flex justify-center items-center cursor-pointer select-none">
                      9+
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="border border-gray-600" />
          </div>
        ))}
      </div>
      <button onClick={add} className="btn">
        Add number
      </button>
    </div>
  );
}
